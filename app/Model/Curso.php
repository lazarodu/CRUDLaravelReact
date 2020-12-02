<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
  public function alunos()
  {
    return $this->hasMany("App\Model\Aluno");
  }
}
