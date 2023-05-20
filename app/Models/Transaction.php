<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'reference_code',
        'cash_id',
        'user_id',
        'grand_total'
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function cash(): BelongsTo
    {
        return $this->belongsTo(Cash::class);
    }
    public function transaction_details(): HasMany
    {
        return $this->hasMany(TransactionDetail::class);
    }
    public function purchase(): HasOne
    {
        return $this->hasOne(Purchase::class);
    }
}
