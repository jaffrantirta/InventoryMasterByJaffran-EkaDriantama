<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Deprecation extends Model
{
    use HasFactory;
    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }
    public function journal(): BelongsTo
    {
        return $this->belongsTo(Journal::class);
    }
}
