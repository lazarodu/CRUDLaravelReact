import React from "react";
import { Switch, Route } from "react-router-dom";
import Aluno from "./pages/Aluno";
import AlunoStore from "./pages/Aluno/store";

const Routes = () => {
  const route = process.env.MIX_APP_ROUTE;
  return (
    <Switch>
      <Route path={`${route}/aluno/:id`} component={AlunoStore} />
      <Route path={`${route}/aluno`} component={Aluno} />
    </Switch>
  );
};

export default Routes;
