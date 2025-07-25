export const DirectionsModule: any = {
  domain: {
    entity: {
      src: "src/app/domain/entities",
      example: "src/scripts/domain/entity/example_entity/entity.txt"
    },
    repository: {
      src: 'src/app/domain/repositories',
      example: 'src/scripts/domain/repository/example_repository/repository.txt',
    },
  },
  infrastructure_http: {
    repository: {
      src: 'src/app/infrastructure/http',
      example: 'src/scripts/infrastructure/http/repository/example_repository/repository.txt',
    },
    mappers: {
      src: 'src/app/infrastructure/http',
      example: 'src/scripts/infrastructure/http/mapper/example_mapper/mapper.txt',
    },
    models: {
      src: 'src/app/infrastructure/http',
      example: 'src/scripts/infrastructure/http/models/example_model/model.txt',
    },
  },
  infrastructure_local: {
    repository: {
      src: 'src/app/infrastructure/local',
      example: 'src/scripts/infrastructure/local/repository/example_repository/repository.txt',
    },
    mappers: {
      src: 'src/app/infrastructure/local',
      example: 'src/scripts/infrastructure/local/mapper/example_mapper/mapper.txt',
    },
    models: {
      src: 'src/app/infrastructure/local',
      example: 'src/scripts/infrastructure/local/models/example_model/model.txt',
    },
  },
  application: {
    use_case: {
      src: 'src/app/application/use-cases',
      example: 'src/scripts/application/use-case/example_use_case/use_case.txt',
    },
    module: {
      src: 'src/app/application/use-cases',
      example: 'src/scripts/application/module/example_module/module.txt',
    }
  }
}
