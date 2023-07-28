<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api/noviti', name: 'apiv1_')]
class LoanController extends AbstractController
{

    #[Route('/generate-loan-schedule', methods: ['POST'] )]
    public function generateLoanSchedule(Request $request): JsonResponse
    {
        $jsonData = $request->getContent();
        $requestData = json_decode($jsonData, true);
    
        $loanAmount = $requestData['loanAmount'];
        $term = $requestData['term'];
        $yearlyInterest = $requestData['yearlyInterest'];

    // Ensure the term is valid and greater than zero
    if ($term <= 0) {
        return $this->json(['error' => 'Invalid term. The term must be greater than zero.'], 400);
    }

    // Calculate monthly interest rate and monthly payment (considering 0% interest rate)
    if ($yearlyInterest === 0) {
        $monthlyPayment = $loanAmount / $term;
    } else {
        $monthlyInterestRate = $yearlyInterest / 100 / 12;
        $denominator = 1 - pow(1 + $monthlyInterestRate, -$term);

        // Ensure the denominator is not zero
        if ($denominator === 0) {
            return $this->json(['error' => 'Invalid interest rate or term. Unable to calculate.'], 400);
        }

        $monthlyPayment = ($loanAmount * $monthlyInterestRate) / $denominator;
    }

    // Generate the loan schedule
    $remainingAmount = $loanAmount;
    $loanSchedule = [];
    for ($i = 1; $i <= $term; $i++) {
        $interest = $remainingAmount * $monthlyInterestRate;
        $principal = $monthlyPayment - $interest;
        $remainingAmount -= $principal;

        $loanSchedule[] = [
            'no' => $i,
            'remainingAmount' => number_format($remainingAmount, 2),
            'principal' => number_format($principal, 2),
            'interest' => number_format($interest, 2),
            'totalPayment' => number_format($monthlyPayment, 2),
        ];
    }

    return $this->json(['loanSchedule' => $loanSchedule]);
}


}
