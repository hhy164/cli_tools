import ansiEscapes from 'ansi-escapes';

export interface Position {
  x: number;
  y: number
}

export interface ITerminalSizeRes {
  columns: number;
  rows: number;
}
export abstract class BaseUi {
  private readonly stdout: NodeJS.WriteStream = process.stdout;

  public print(text: string) {
    this.stdout.write(text)
  }

  public setCursorAt({ x, y }: Position) {
    this.print(ansiEscapes.cursorTo(x, y))
  }

  public printAt(message: string, position: Position) {
    this.setCursorAt(position)
    this.print(message)
  }

  public clearLine(row: number) {
    // 清除当前行
    this.printAt(ansiEscapes.eraseLine, { x: 0, y: row })
  }

  get terminalSize(): ITerminalSizeRes {
    return {
      columns: this.stdout.columns,
      rows: this.stdout.rows,
    }
  }
  abstract render(): void;
}