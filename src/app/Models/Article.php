<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    // 論理削除するためのトレイト
    use SoftDeletes;

    protected $fillable = [
        'title',
        'category_id',
        'summary',
        'url',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'deleted_at',
    ];

    public function user ()
    {
        return $this->belongsTo('App\User');
    }

    public function category () {
        return $this->belongsTo('App\Models\Category');
    }
}
