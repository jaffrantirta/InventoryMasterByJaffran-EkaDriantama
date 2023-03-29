<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Journal extends Model
{
    use HasFactory;
    protected $fillable = [
        'date',
        'description',
        'user_id'
    ];
    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
    public function cashes(): HasMany
    {
        return $this->hasMany(Cash::class);
    }
    public function deprecations(): HasMany
    {
        return $this->hasMany(Deprecation::class);
    }
    public function journal_details(): HasMany
    {
        return $this->hasMany(JournalDetail::class);
    }
    
}
