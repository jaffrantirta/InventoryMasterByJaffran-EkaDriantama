<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ItemRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'reference_code' => 'required',
            'name' => ['string', 'max:255', 'required'],
            'price' => ['numeric', 'required'],
            'stock' => ['numeric', 'required'],
            'min_stock' => ['numeric'],
            'categories' => ['required', 'exists:categories,id'],
            'shipping_day' => ['numeric', 'min:1']
        ];
    }
}
