# HelpMe

Programme permettant de mettre en place une conversation entre une personne connecté sur un site web, et une personne connecté sur discord. Tout le programme est dans le dossier /Program.

## Contenu

### Static/

Fichier html utilisé pour la page web.

### main.go

Démarre le serveur web, initialise le bot discord et fait le lien entre le site web et le bot discord.

### bot.go

Contient le code utilisé pour faire tourner le bot discord.

### go.mod et go.sum

Fichier golang gérant les imports et packages utilisés.

## Utilisation

Tout d'abord il vous faut un bot discord. Après l'avoir ajouté sur votre serveur discord vous pouvez ajouter le token de votre bot dans le fichier Program/bot.go à la ligne 9 :
```go
var Token = ""
```
Vous pouvez ensuite lancer le program par exemple en saisissant (depuis le dossier contenant le programme) :
```sh
$ go run .
```
Une fois que le message "Bot is ready" apparaît dans le terminal, envoyez le message "start" dans un salon textuel du serveur dans le lequel le bot est présent. Cela indiquera au bot qu'il s'agit du salon dans lequel le bot doit fonctionner. Les messages "Server online" et "Channel id saved" apparaîtront dans votre terminal. Vous pouvez maintenant accéder au site avec l'url : localhost:8080/
Une fois un premier message envoyé depuis le site, le bot va créer un thread. Vous pouvez converser entre le site et le thread. La conversation sera affiché sur discord dans le thread et sur le site (n'oubliez pas de rafraîchir la page web après un nouveau message depuis discord).
