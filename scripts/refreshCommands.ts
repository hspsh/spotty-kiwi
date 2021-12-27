import PluginManager from '../lib/plugins/pluginManager'

(async () => {
    const manager = PluginManager.create() 
    await manager.refreshCommands()
})()
