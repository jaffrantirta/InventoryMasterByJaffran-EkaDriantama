<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JournalDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'account_id',
        'journal_id',
        'credit',
        'debit'
    ];
    public function journal(): BelongsTo
    {
        return $this->belongsTo(Journal::class);
    }
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }
}
