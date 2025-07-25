import {DirectionsModule} from "../../directions";
import {CreateRepository} from "./repository/createRepository";

function createInfrastructureLocalComplete() {

  const params: string[] = process.argv;

  const directions: any = DirectionsModule;

  CreateRepository.constructRepository(directions.infrastructure_local.repository.src, directions.infrastructure_local.repository.example);

}


createInfrastructureLocalComplete();
