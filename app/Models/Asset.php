<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Asset extends Model
{
    use HasFactory;
    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }
    public function journal(): BelongsTo
    {
        return $this->belongsTo(journal::class);
    }
    public function deprecations(): HasMany
    {
        return $this->hasMany(Deprecation::class);
    }
}
