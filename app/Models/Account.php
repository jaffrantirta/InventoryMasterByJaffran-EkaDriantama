<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Account extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'code',
        'classification',
        'initial_balance'
    ];
    public function account_setting(): HasOne
    {
        return $this->hasOne(AccountSetting::class);
    }
    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
    public function journal_details(): HasMany
    {
        return $this->hasMany(JournalDetail::class);
    }

}
