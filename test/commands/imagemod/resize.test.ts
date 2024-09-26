import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('imagemod:resize', () => {
  it('runs imagemod:resize cmd', async () => {
    const {stdout} = await runCommand('imagemod:resize')
    expect(stdout).to.contain('hello world')
  })

  it('runs imagemod:resize --name oclif', async () => {
    const {stdout} = await runCommand('imagemod:resize --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
