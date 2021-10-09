import PluginManager from '../lib/plugins/pluginManager'

(async () => {
    const manager = new PluginManager()
    await manager.loadPlugins()
    await manager.refreshCommands()
})()
