<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountSetting extends Model
{
    use HasFactory;
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }
}
