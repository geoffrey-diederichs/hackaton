package main 

import (
	"fmt"
	"strings"
	"github.com/bwmarrin/discordgo"
)

var Token = ""

var ChannelId string
var Thread *discordgo.Channel
var Session *discordgo.Session

func initBot() {
	Session, _ = discordgo.New("Bot " + Token)
	Session.AddHandler(func(Session *discordgo.Session, r *discordgo.Ready) {
		fmt.Println("Bot is ready")
	})

	Session.AddHandler(func(Session *discordgo.Session, m *discordgo.MessageCreate) {
		if m.Author.ID == Session.State.User.ID {
			return
		}

		if strings.Contains(m.Content, "start") && Thread == nil  {
			ChannelId = m.ChannelID
			fmt.Println("Channel id saved")
		} else if Thread != nil && m.ChannelID == Thread.ID {
			fmt.Println(m.Content)
			transferData(m.Content)
		}
	})

	Session.Identify.Intents = discordgo.MakeIntent(discordgo.IntentsAllWithoutPrivileged)

	err := Session.Open()
	if err != nil {
		panic(err)
	}
}

func checkChannelId() bool {
	if ChannelId == "" {
		return false
	}
	return true
}

func startThread(mail string) {
	if Thread != nil || ChannelId == "" {
		return
	}
	
	message, _ := Session.ChannelMessageSend(ChannelId, mail)
	if ch, err := Session.State.Channel(message.ChannelID); err != nil || !ch.IsThread() {
		Thread, err = Session.MessageThreadStartComplex(message.ChannelID, message.ID, &discordgo.ThreadStart{
			Name:                mail,
			AutoArchiveDuration: 60,
			Invitable:           false,
			RateLimitPerUser:    10,
		})
		if err != nil {
			panic(err)
		}
	}
}


func messageThread(message string) bool {
	if Thread == nil {
		return false
	}

	_, err := Session.ChannelMessageSend(Thread.ID, message)
	if err != nil {
		return false
	}
	return true
}
