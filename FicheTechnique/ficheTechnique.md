# Fiche technique

Battle adventure est un serveur minecraft de pvp/ faction basé sur l'univers de Dofus/ Wakfu. Il dispose d'un site web facilitant et détaillant le fonctionnement du serveur ainsi que d'un serveur discord. Nous avions une semaine pour trouver des améliorations possibles, cette fiche technique détaille les fonctionnalités sur lesquelles nous avons travaillé.

## Problématique

Le site web a entre autres pour objectif de permettre aux nouveaux utilisateurs de se connecter aux serveurs, et de fournir diverses informations sur le fonctionnement du pvp faction. Seulement un surplus d'informations non essentielles rend la navigation sur le site difficile, et les seules interactions possibles avec des administrateurs pour obtenir des informations rapides nécessitent de se connecter à un nouveau serveur Discord. De plus le site propose très peu de fonctionnalités ayant pour objectif de satisfaire des utilisateurs réguliers.

Nous nous sommes donc demandés : quelles innovations peuvent être mises en place sur le site web pour faciliter l'arrivée de nouveaux utilisateurs et fidéliser les anciens ?

## Objectifs

### Casino

Pour fidéliser des utilisateurs, nous avons pensé à un jeu de hasard pour remporter des lots liés au serveur. Les utilisateurs auront quotidiennement une seule utilisation gratuite pour les motiver à se reconnecter. Ils pourront évidemment payer pour plus l'utiliser.
Ce jeu devra être immersif en plus de respecter la charte graphique.

### Help me

Pour faciliter la communication entre de potentiels nouveaux utilisateurs essayant de se connecter au serveur rapidement et les administrateurs du serveur, nous avons pensé à une interface web, relié à Discord permettant à de nouveaux utilisateurs de poser des questions depuis le site web, sans se connecter, les messages étant transmis sur Discord par un bot d’où les administrateur pourront répondre.
Cette interface de support devra être intuitive et efficace.

## Solutions proposées

### Casino

Technologies utilisées :
    - JS : langage populaire, supporté par tous les navigateurs, mis à jour en continu et dispose de nombreux frameworks, bibliothèques. Il est aussi possible de l’intégrer avec d’autres langages (php, laravel, etc).
    - HTML/SCSS : langage classique d’affichage et mise en page permettant de créer un design pour le jeu. SCSS permet aussi de créer des variables, des imbrications par rapport à CSS et de mieux organiser son code.

Fonctionnalités et valeurs ajoutée :
    - La fonction Promise qui permet d’exécuter le code que si toutes les variables ont bien été crées et la fonction Math.random() qui génére un nombre aléatoire de 0 à 1 à chaque tour (pour utiliser ces fonctions dans d’autres langages comme Php il faut installer des librairies externes comme React). Cela garantie un système fiable et équitable.
    - Interface graphique en CSS/ HTML représentant un tirage rouleau par rouleau. Ce roulement garde le suspens et permet d'immerger le joueur dans le jeu.
    - Un essai gratuit par jour, des essais supplémentaires payants. Cela fidélise les utilisateurs en leur donnant des récompenses quotidiennes.
    - Des probabilités fixées : 
        - 3,7% de chance qu'une image quelconque apparait en double (petit lot)
        - 0,8% de chance qu'un double d'images parmis les images "spéciales" (images bien définies pas le jeu au préalable) apparaisse (lot moyen)
        - 0,1% de chance de jackpot, autrement dit qu'un type d’image apparait en triple (gros lot)
    - Une rotation aléatoire de récompenses chaque semaine. Cela garde le jeu intéressant.
    - Une transparence en laissant l'accès aux probabilités derrière le jeu. Pour créer une relation de confiance avec les joueurs.

### Help me

Technologies utilisées :
    - Golang : language simple, compilé et performant. Autrement dit le programme pourra facilement être modifié, amélioré et sera déployé depuis n’importe quel serveur sans problèmes de performances.
    - Package discordgo (https://github.com/bwmarrin/discordgo) : un package golang facilitant la création de bots discord.

Fonctionnalités :
    - Serveur lancant une page web, un bot discord, et faisant circuler les messages entre le bot et la page web.
    - Site web permettant à un utilisateur d’envoyer un message, et affichant la conversation.
    - Bot discord démarrant le thread pour la conversation, envoyant les messages de l’utilisateur sur ce thread, et relayant les messages des administrateurs au serveur.

Valeurs ajoutées :
    - Communication entre les nouveaux utilisateurs et les administrateurs sans qu’ils aient à se connecter au serveur discord pour apporter des conseils rapidement leur permettant de profiter du serveur sans se perdre dans de la documentation.

# Conclusion

Nous estimons que ces améliorations faciliteront l'utilisation du site et l'accès aux serveurs pour les nouveaux utilisateurs en plus de donner des raisons de se reconnecter quotidiennement aux utilisateurs plus aguerris.
Notre travail pourrait encore être amélioré en développant une interface administrateur pour orienter les probabilités de jeu, un classement des joueurs ayant obtenues les meilleures récompenses, et un algorithme observant le comportement des nouveaux utilisateurs pour déterminer s'il faudrait leur proposer une conversation avec les administrateurs.
