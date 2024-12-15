<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perbaikan extends Model
{
    protected $table = 'perbaikans';
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function part_perbaikans()
    {
        return $this->hasMany(PartPerbaikan::class);
    }

    public function transaski()
    {
        return $this->hasOne(Transaksi::class, 'perbaikan_id');
    }
}
