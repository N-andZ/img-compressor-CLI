import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('imagemod:compress', () => {
  it('runs imagemod:compress cmd', async () => {
    const {stdout} = await runCommand('imagemod:compress')
    expect(stdout).to.contain('hello world')
  })

  it('runs imagemod:compress --name oclif', async () => {
    const {stdout} = await runCommand('imagemod:compress --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
