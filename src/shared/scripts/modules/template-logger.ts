export const logTemplateMessage = () => {
  const emojis = ['🚀', '✨', '🔥', '🎯', '🌟']
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  console.log(
    `${randomEmoji} Template activated at ${new Date().toLocaleTimeString()} ${randomEmoji}\n` +
      'Project: Liga Astro Template\n' +
      `Build date: ${new Date().toLocaleDateString()}`
  )
}
