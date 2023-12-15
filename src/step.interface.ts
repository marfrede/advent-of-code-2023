// operation: "-"                                 => REMOVE remove lens from box (of present, remaining move forwards)
// operation: "=" (means "has focalLength value") => UPSERT replace lens in box with same label, else add lens
export interface Step {
  lensLabel: string; // perform hash-alg here => determine box (0-255)
  focalLength: number | undefined; // undefined => operation"-", defined => operation"="
}
