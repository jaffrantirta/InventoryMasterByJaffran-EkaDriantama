<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Unit extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'sum',
        'item_id'
    ];
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
