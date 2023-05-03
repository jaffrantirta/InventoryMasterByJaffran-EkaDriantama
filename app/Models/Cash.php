<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cash extends Model
{
    use HasFactory;
    protected $fillable = [
        'journal_id',
        'user_id',
        'type',
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function journal(): BelongsTo
    {
        return $this->belongsTo(Journal::class);
    }
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
