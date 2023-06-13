<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'reference_code' => 'required|unique:transactions,reference_code',
            'date' => 'required|date',
            'discount' => 'numeric',
            'items_selected' => 'required|array|min:1',
            'items_selected.*.item_id' => 'required|exists:items,id',
            'items_selected.*.qty' => 'required|numeric|min:0',
            'items_selected.*.price' => 'required|numeric|min:0',
            'items_selected.*.is_wholesaler' => 'required|boolean',
        ];
    }
}
