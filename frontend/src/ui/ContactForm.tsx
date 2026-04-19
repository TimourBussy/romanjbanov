import {useTranslation} from 'react-i18next'
import {FiSend} from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import {useRef, useState} from 'react'

export function ContactForm({className}: {className?: string}) {
  const {i18n} = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  return (
    <section className={className || undefined}>
      <form
        ref={formRef}
        onSubmit={async (e: React.SubmitEvent) => {
          e.preventDefault()
          if (!formRef.current) return
          setStatus('sending')
          try {
            await emailjs.sendForm(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
              formRef.current,
              import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            )
            setStatus('success')
            formRef.current.reset()
          } catch {
            setStatus('error')
          }
        }}
        className="flex flex-col gap-6 mb-16"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 text-sm font-semibold">
            {i18n.language === 'FR' ? 'Nom' : 'Name'} *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700 text-sm font-semibold">
            Email *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="text-gray-700 text-sm font-semibold">
            {i18n.language === 'FR' ? 'Sujet' : 'Subject'} *
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-gray-700 text-sm font-semibold">
            Message *
          </label>
          <textarea
            name="message"
            id="message"
            rows={6}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex justify-center items-center gap-2 mt-2 bg-amber-700 text-white font-semibold py-3 rounded-lg hover:bg-amber-800 transition-colors"
        >
          <FiSend size={20} />
          {status === 'sending'
            ? i18n.language === 'FR'
              ? 'Envoi...'
              : 'Sending...'
            : i18n.language === 'FR'
              ? 'Envoyer le message'
              : 'Send message'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-center">
            {i18n.language === 'FR' ? 'Message envoyé !' : 'Message sent!'}
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center">
            {i18n.language === 'FR' ? 'Erreur, réessayez.' : 'Error, please try again.'}
          </p>
        )}
      </form>
      <hr className="border-gray-200" />
    </section>
  )
}
