<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Item extends Model
{
    use HasFactory;
    protected $fillable = [
        'reference_code',
        'name',
        'price',
        'stock',
        'min_stock',
        'shipping_day'
    ];
    public function transaction_details(): HasMany
    {
        return $this->hasMany(TransactionDetail::class);
    }
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'item_categories');
    }
    public function unit(): HasOne
    {
        return $this->hasOne(Unit::class);
    }
}
