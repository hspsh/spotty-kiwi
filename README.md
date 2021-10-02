# spotty-kiwi :kiwi_fruit:

## Deployment

The recommended way to deploy spotty-kiwi is using [pre-built images][docker-packages].

Configuration is done through environment variables:

| Name | Value  |
| ---- | ------ | 
| `BOT_TOKEN` | Discord bot token |
| `APPLICATION_ID` | Discord application ID |
| `GUILD_ID` | Discord server ID |
| `WHOIS_API` | URL for [whohacks][whohacks-repo] API root | 

[docker-packages]: https://github.com/hspsh/spotty-kiwi/pkgs/container/spotty-kiwi
[whohacks-repo]: https://github.com/hspsh/whohacks

## Development

```
yarn install
yarn dev  # bot will restart on changes
```
