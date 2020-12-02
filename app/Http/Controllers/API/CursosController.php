<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;
use App\Model\Curso;
use Illuminate\Http\Request;

class CursosController extends Controller
{
  public function index()
  {
    $cursos = Curso::all();
    return new DataResource($cursos);
  }
}
