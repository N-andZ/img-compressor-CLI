import {Args, Command, Flags} from '@oclif/core'
// import { readdir } from 'node:fs'
import {readdir} from 'node:fs/promises'
import { createRequire } from 'node:module';
import sharp from 'sharp';
const require = createRequire(import.meta.url);
var fs = require('fs');

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
    this.log(`Resizing images`)
    await resizeImages(args.path);




    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /home/alan/01 Projects/0.1.06 OTHER/img-compressor-CLI/src/commands/imagemod/resize.ts`)
    // if (args.dimensions && flags.force) {
    //   this.log(`you input --force and --file: ${args.dimensions}`)
    // }
  }
}


async function resizeImages(path: string | undefined){
  try{
    if (path){
      fs.readdir(path, (er: any,files: any)=>{
        files.forEach(async ({file}:{file: any}) => {
          const imageData = fs.readFile(file, (err: any,data: any)=>{
            if (err) throw err;
            return data;
          })
          return await resizeAlgorithm(imageData);
        });
      });
     
    }
  

  }
  catch (err){
    console.log(err);
  }
}

async function resizeAlgorithm(input:string){
  console.log("running resizing alg");
  let transformer = sharp(input)
  .resize(900,900)
  .toFile('output.jpg', function(err){
    console.log(err);
  })
  return transformer;
}