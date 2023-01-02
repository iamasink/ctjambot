const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType, } = require('discord.js')
const embeds = require('../../structure/embeds')
const values = [
    {
        label: 'Track Creator',
        description: 'For track creators',
        value: 'trackcreator',
        emoji: {
            name: 'TrackCreator',
            id: '1045504033546321981',
        }
    },
    {
        label: 'Blender',
        description: 'For Blender users',
        value: 'blender',
        emoji: {
            name: 'Blender',
            id: '1043722412287606804',
        }
    },
    {
        label: 'Sketchup',
        description: 'For Sketchup users',
        value: 'sketchup',
        emoji: {
            name: 'Sketchup',
            id: '1043722441878413353',
        },
    },
    {
        label: 'Skender',
        description: 'For both Blender and Sketchup users',
        value: 'skender',
        emoji: {
            name: 'Skender',
            id: '1045502823967752292',
        }
    },
    {
        label: '3DS Max',
        description: 'For 3DS Max users',
        value: '3dsmax',
        emoji: {
            name: '3DSMax',
            id: '1043722369719611483',
        },
    },
    {
        label: 'MS Paint',
        description: 'For MS Paint users',
        value: 'mspaint',
        emoji: {
            name: 'MSPaint',
            id: '1045505263257530398',
        }
    },
    {
        label: 'Polls',
        description: 'For users wanting to be pinged for polls',
        value: 'polls',
        emoji: {
            name: 'Polls',
            id: '1045507985100787825',
        }
    },
    {
        label: 'TASer',
        description: 'For TASers',
        value: 'taser',
        emoji: {
            name: 'TASer',
            id: '1045508174775591003',
        }
    },
    {
        label: 'Gamner',
        description: 'For those wanting to be pinged in #👾-gamning-chat',
        value: 'gamner',
        emoji: {
            name: 'Gamer',
            id: '1045508173664092191',
        }
    },
    {
        label: 'Jelly Goobler',
        description: 'For those wanting to be pinged for CT Jellies',
        value: 'jelly',
        emoji: {
            name: 'Jelly',
            id: '1045504966816698399',
        }
    },
    {
        label: 'Turbo Jammer',
        description: 'For those wanting to be pinged for Turbo Jams',
        value: 'turbo',
        emoji: {
            name: 'Turbo',
            id: '1045505017530036315',
        }
    },]



module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Lets you pick roles you want'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        const user = await interaction.user.fetch()
        const member = await interaction.guild.members.resolve(user)
        const rows = []

        for (let row = 0, len = Math.ceil(values.length / 5); row < len; row++) {
            for (let component = 0, len = iterable.length; component < len; component++) {
                rows[row].addComponents(
                    new ButtonBuilder()
                        .setLabel(values[component].label)
                        .setEmoji(values[component].emoji)
                )
            }

        }



        // .addComponents(
        //     new SelectMenuBuilder()
        //         .setCustomId('rolemenu')
        //         .setPlaceholder('Nothing selected')
        //         .addOptions(
        //             {
        //                 label: 'Track Creator',
        //                 description: 'For track creators',
        //                 value: 'trackcreator',
        //                 emoji: {
        //                     name: 'TrackCreator',
        //                     id: '1045504033546321981',
        //                 }
        //             },
        //             {
        //                 label: 'Blender',
        //                 description: 'For Blender users',
        //                 value: 'blender',
        //                 emoji: {
        //                     name: 'Blender',
        //                     id: '1043722412287606804',
        //                 }
        //             },
        //             {
        //                 label: 'Sketchup',
        //                 description: 'For Sketchup users',
        //                 value: 'sketchup',
        //                 emoji: {
        //                     name: 'Sketchup',
        //                     id: '1043722441878413353',
        //                 },
        //             },
        //             {
        //                 label: 'Skender',
        //                 description: 'For both Blender and Sketchup users',
        //                 value: 'skender',
        //                 emoji: {
        //                     name: 'Skender',
        //                     id: '1045502823967752292',
        //                 }
        //             },
        //             {
        //                 label: '3DS Max',
        //                 description: 'For 3DS Max users',
        //                 value: '3dsmax',
        //                 emoji: {
        //                     name: '3DSMax',
        //                     id: '1043722369719611483',
        //                 },
        //             },
        //             {
        //                 label: 'MS Paint',
        //                 description: 'For MS Paint users',
        //                 value: 'mspaint',
        //                 emoji: {
        //                     name: 'MSPaint',
        //                     id: '1045505263257530398',
        //                 }
        //             },
        //             {
        //                 label: 'Polls',
        //                 description: 'For users wanting to be pinged for polls',
        //                 value: 'polls',
        //                 emoji: {
        //                     name: 'Polls',
        //                     id: '1045507985100787825',
        //                 }
        //             },
        //             {
        //                 label: 'TASer',
        //                 description: 'For TASers',
        //                 value: 'taser',
        //                 emoji: {
        //                     name: 'TASer',
        //                     id: '1045508174775591003',
        //                 }
        //             },
        //             {
        //                 label: 'Gamner',
        //                 description: 'For those wanting to be pinged in #👾-gamning-chat',
        //                 value: 'gamner',
        //                 emoji: {
        //                     name: 'Gamer',
        //                     id: '1045508173664092191',
        //                 }
        //             },
        //             {
        //                 label: 'Jelly Goobler',
        //                 description: 'For those wanting to be pinged for CT Jellies',
        //                 value: 'jelly',
        //                 emoji: {
        //                     name: 'Jelly',
        //                     id: '1045504966816698399',
        //                 }
        //             },
        //             {
        //                 label: 'Turbo Jammer',
        //                 description: 'For those wanting to be pinged for Turbo Jams',
        //                 value: 'turbo',
        //                 emoji: {
        //                     name: 'Turbo',
        //                     id: '1045505017530036315',
        //                 }
        //             },
        //         ),
        // )
        const message = await interaction.editReply({ embeds: embeds.messageEmbed(`Select the roles you would like to have.`), components: [row], ephemeral: true })
        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60 * 1000 })

        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                value = i.values[0]



                const roles = await member.roles.cache
                id = ''
                label = ''

                switch (value) {
                    case 'trackcreator': {

                        id = '750809059707453440'
                        label = 'Track Creator'
                        break
                    }
                    case 'blender': {

                        id = '775916265952641095'
                        label = 'Blender'
                        break
                    }
                    case 'sketchup': {

                        id = '775916268842778634'
                        label = 'Sketchup'
                        break
                    }
                    case '3dsmax': {

                        id = '775916260936384572'
                        label = '3DS Max'
                        break
                    }
                    case 'skender': {

                        id = '894247499387269120'
                        label = 'Skender'
                        break
                    }
                    case 'mspaint': {

                        id = '1043614129841254532'
                        label = 'MS Paint'
                        break
                    }
                    case 'polls': {

                        id = '1026212758900981792'
                        label = 'Polls'
                        break
                    }
                    case 'taser': {

                        id = '850496718608138310'
                        label = 'TASer'
                        break
                    }
                    case 'gamner': {

                        id = '908758240433688626'
                        label = 'Gamner'
                        break
                    }
                    case 'jelly': {

                        id = '1013836959380144218'
                        label = 'Jelly Goobler'
                        break
                    }
                    case 'turbo': {

                        id = '1013835745275936880'
                        label = 'Turbo Jammer'
                        break
                    }
                    default: {
                        throw new Error('invalid role ID')
                    }
                }
                if (roles.find(r => r.id === id)) {
                    console.log(member, id)
                    await i.guild.members.removeRole({ user: member, role: id, reason: `rolemenu` })
                    i.reply({ embeds: embeds.messageEmbed(`Removed role ${label}`), ephemeral: true })


                }
                else {
                    console.log(member, id)
                    await i.guild.members.addRole({ user: member, role: id, reason: `rolemenu` })
                    i.reply({ embeds: embeds.messageEmbed(`Added role ${label}`), ephemeral: true })


                }
            } else return
        })

    },
}