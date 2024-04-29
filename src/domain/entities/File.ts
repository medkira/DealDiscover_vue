export type FileProps = {
  fieldname: string;
  name: string;
  size: number;
  type: string;
  extension: string;
  buffer: any;
};

export class File {
  public readonly fieldname: string;
  public readonly name: string;
  public readonly size: number;
  public readonly type: string;
  public readonly extension: string;
  public readonly buffer: any;

  constructor(props: FileProps) {
    this.fieldname = props.fieldname;
    this.name = props.name;
    this.size = props.size;
    this.type = props.type;
    this.extension = props.extension;
    this.buffer = props.buffer;
  }
}
