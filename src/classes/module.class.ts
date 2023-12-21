import { Pulse } from "./pulse.type";

type FlipFlop = "flip-flop";
type Conjunction = "conjunction";
type Broadcaster = "broadcaster";
export type ModuleType = FlipFlop | Conjunction | Broadcaster;

export abstract class Module {
  protected static type: ModuleType;
  protected outputModules: Module[] = [];

  public addOutput(outputModule: Module) {
    this.outputModules.unshift(outputModule);
  }

  public sendPulse(pulseIncoming: Pulse): void {
    const outputModule = this.outputModules.pop();
    const pulseOutgoing = this.getNextPulse(pulseIncoming);
    if (outputModule && pulseOutgoing) {
      outputModule.sendPulse(pulseOutgoing);
    }
  }

  protected abstract getNextPulse(pulseIncoming: Pulse): Pulse | undefined;
}

export class FlipFlopModule extends Module {
  protected static type: FlipFlop = "flip-flop";
  private on: boolean = false;

  protected getNextPulse(pulseIncoming: Pulse): Pulse | undefined {
    if (pulseIncoming === "high") return undefined;
    this.on = !this.on;
    return this.on ? "high" : "low";
  }
}

export class ConjunctionModule extends Module {
  protected static type: Conjunction = "conjunction";
  private pulsesToReceive: number = 0;
  private pulsesReceived: number = 0;
  private pulseToSend: Pulse = "low";

  public addInput() {
    this.pulsesToReceive++;
  }

  public getNextPulse(pulse: Pulse): Pulse | undefined {
    const outputModule = this.outputModules.pop();
    this.pulsesReceived++;
    this.setPulseToSend(pulse);

    if (this.pulsesToReceive < this.pulsesReceived) {
      return undefined;
    } else if (this.pulsesToReceive === this.pulsesReceived) {
      this.pulsesReceived = 0;
      return this.pulseToSend;
    }
    throw new Error("programming mistake");
  }

  private setPulseToSend(pulseReceived: Pulse) {
    if (pulseReceived === "low") {
      this.pulseToSend = "high";
    }
  }
}

export class BroadcasterModule extends Module {
  protected static type: Broadcaster = "broadcaster";

  public sendPulse(pulse: Pulse): void {
    for (const module of this.outputModules) {
      module.sendPulse(pulse);
    }
  }

  protected getNextPulse(pulseIncoming: Pulse): Pulse | undefined {
    const pulseOutgoing = pulseIncoming;
    return pulseOutgoing;
  }
}
