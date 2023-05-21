<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionStorePurchaseRequest extends FormRequest
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
            'items_selected' => 'required|array|min:1',
            'items_selected.*.item_id' => 'required|exists:items,id',
            'items_selected.*.qty' => 'required|numeric|min:0',
            'items_selected.*.price' => 'required|numeric|min:0',
            'items_selected.*.is_wholesaler' => 'required|boolean',
            'items_selected.*.reference_code' => 'required',
            'items_selected.*.name' => ['string', 'max:255', 'required'],
            'items_selected.*.price' => ['numeric', 'required'],
            'items_selected.*.stock' => ['numeric', 'required'],
            'items_selected.*.min_stock' => ['numeric'],
            'items_selected.*.categories' => ['required', 'exists:categories,id'],
            'items_selected.*.shipping_day' => ['numeric', 'min:1'],
            'items_selected.*.unit.name' => ['max:255', 'required_if:is_wholesaler,true'],
            'items_selected.*.unit.sum' => ['numeric', 'required_if:is_wholesaler,true'],
            'items_selected.*.unit.price' => ['numeric', 'required_if:is_wholesaler,true'],
        ];
    }
}
