import { Module, BroadcasterModule, FlipFlopModule, ConjunctionModule, ModuleType } from "./module.class";

export class ModuleFactory {
  constructor() {}

  private createdModules: Module[] = [];

  public create(type: ModuleType): Module {
    switch (type) {
      case "broadcaster":
        return new BroadcasterModule();
      case "flip-flop":
        return new FlipFlopModule();
      case "conjunction":
        return new ConjunctionModule();
    }
  }
}
