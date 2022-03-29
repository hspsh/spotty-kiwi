import PluginManager from '../lib/plugins/pluginManager'
;(async () => {
    const manager = await PluginManager.create()
    await manager.refreshCommands()
})()
