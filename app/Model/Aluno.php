<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
  protected $fillable = ["nome", 'descricao', 'curso_id'];
  public function curso()
  {
    return $this->belongsTo("App\Model\Curso");
  }
}
