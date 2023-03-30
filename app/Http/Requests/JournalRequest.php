<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class JournalRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required',
            'date' => 'required|date',
            'journal_details' => 'required|array|min:2',
            'journal_details.*.account_id' => 'required|exists:accounts,id',
            'journal_details.*.debit' => 'required|numeric|min:0',
            'journal_details.*.credit' => 'required|numeric|min:0',
        ];
    }
}
