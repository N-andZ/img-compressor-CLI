import {Args, Command, Flags} from '@oclif/core'
import { read } from 'node:fs';
// import { readdir } from 'node:fs'
import {readdir, mkdir} from 'node:fs/promises'
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { buffer } from 'stream/consumers';
const require = createRequire(import.meta.url);
var fs = require('fs');

export default class ImagemodResize extends Command {
  static override args = {
    // dimensions: Args.string({name: 'dimensions' ,description: 'file to read'}),
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
    const pathName = args.path;
    const destinationFolderPath: string = `${pathName}\\target`

    // this.log(`running:  + ${args.dimensions} , ${args.path}`);
    this.log('Creating Destination Folder');
    // Create the destination folder for the changed images
    // mkdir(destinationFolderPath, {recursive: true});

    this.log(`Resizing images`);
    const bufferArray = await getImageBuffers(pathName);

    this.log('Creating Destination Folder');
    // Create the destination folder for the changed images
    mkdir(destinationFolderPath, {recursive: true});

    if (bufferArray){
      let i = 0;
      for (const image of bufferArray){
        i++;
        console.log(image);
        await sharp (image).toFile(`${destinationFolderPath}\\test-${i}.jpg`);
      }
    }




  }
}


async function getImageBuffers (folderPath: string | undefined){
  let bufferArray: Array<any> = []; 
  // let fileNames: Array<string> = [];
  if (folderPath){
    try{
      const imageNames = await fs.promises.readdir(folderPath);
      console.log(imageNames);
      for (const imageName of imageNames){
        const imageData = await fs.promises.readFile( `${folderPath}\\${imageName}`);
        bufferArray.push(imageData);
      }
      console.log(bufferArray);
      return bufferArray;
    }
    catch(err){
      console.log(err);
    }
  }
  else {
    console.log("No files found");
  }
}