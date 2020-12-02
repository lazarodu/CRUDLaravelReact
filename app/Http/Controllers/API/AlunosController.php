<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DataResource;
use App\Model\Aluno;
use Illuminate\Http\Request;

class AlunosController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $alunos = Aluno::with(['curso'])->get();
    return new DataResource($alunos);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $request->validate([
      "nome" => "required|max:255",
      "curso_id" => "required|numeric",
      "descricao" => "required"
    ]);
    $aluno = new Aluno([
      "nome" => $request->get('nome'),
      "curso_id" => $request->get('curso_id'),
      "descricao" => $request->get('descricao'),
    ]);
    $aluno->save();
    return new DataResource($aluno);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $aluno = Aluno::with(['curso'])->where('id', $id)->get();
    return new DataResource($aluno);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $request->validate([
      "nome" => "required|max:255",
      "curso_id" => "required|numeric",
      "descricao" => "required"
    ]);
    $aluno = Aluno::findOrFail($id);
    $aluno->nome = $request->get('nome');
    $aluno->curso_id = $request->get('curso_id');
    $aluno->descricao = $request->get('descricao');
    $aluno->save();
    return new DataResource($aluno);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $aluno = Aluno::findOrFail($id);
    $aluno->delete();
    return new DataResource($aluno);
  }
}
