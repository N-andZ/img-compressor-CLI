import {Args, Command, Flags} from '@oclif/core'
// import { readdir } from 'node:fs'
import {readdir} from 'node:fs/promises'

export default class ImagemodResize extends Command {
  static override args = {
    dimensions: Args.string({name: 'dimensions' ,description: 'file to read'}),
    path: Args.string({name: 'path to folder', description: 'path to files'})
  }

  static override description = 'describe the command here'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  // static override flags = {
  //   // flag with no value (-f, --force)
  //   force: Flags.boolean({char: 'f'}),
  //   // flag with a value (-n, --name=VALUE)
  //   name: Flags.string({char: 'n', description: 'name to print'}),
  // }

  public async run(): Promise<void> {
    const {args} = await this.parse(ImagemodResize)
    // this.log(`running:  + ${args.dimensions} , ${args.path}`);
    this.log(`display files: ${await getImages(args.path)}`)



    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /home/alan/01 Projects/0.1.06 OTHER/img-compressor-CLI/src/commands/imagemod/resize.ts`)
    // if (args.dimensions && flags.force) {
    //   this.log(`you input --force and --file: ${args.dimensions}`)
    // }
  }
}


async function getImages(path: string | undefined){
  try{
    if (path){
      const filesPath = await readdir(path);
      for (const file of filesPath)
        console.log(file);
      return filesPath;
    }
  

  }
  catch (err){
    console.log(err);
  }
}