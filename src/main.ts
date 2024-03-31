import * as core from '@actions/core'
import SwaggerParser from '@apidevtools/swagger-parser'

export async function run(): Promise<void> {
  try {
    const filepath: string = core.getInput('filepath')
    core.debug(`Validating ${filepath} ...`)
    const parser = new SwaggerParser()
    const api = await parser.validate(filepath)
    core.debug(`API name: ${api.info.title}, Version: ${api.info.version}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
