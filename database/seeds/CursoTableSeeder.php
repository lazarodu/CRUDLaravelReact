<?php

use App\Model\Curso;
use Illuminate\Database\Seeder;

class CursoTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Curso::create([
      "nome" => 'Informática'
    ]);
    Curso::create([
      "nome" => 'Edificações'
    ]);
    Curso::create([
      "nome" => 'Mecatrônica'
    ]);
  }
}
