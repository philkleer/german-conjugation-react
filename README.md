# German Conjugation 🇩🇪

This is an application to learn basic German conjugation. It is a preliminary version (v0.1) with basic vocabulary and the most common tenses only. You can find the app online at [vercel](https://YOUR-APP-URL.vercel.app/). The code is licensed with CC-BY-NC-SA 4.0 (see `license` file). If you want to add or support the development, just open an issue or pull request.

This app is based on my [German conjugation trainer](https://github.com/philkleer/german-conjugation-react).

If you like this app, you can [buy me a coffee](https://buymeacoffee.com/philkleer).

## Examples

Here you can see examples of the screens:

<img src="examples/view1.png" alt="start view" width="200"> <img src="examples/view2.png" alt="settings view" width="200"> <img src="examples/view3.png" alt="training view" width="200">

<img src="examples/view4.png" alt="correct entry" width="200">  <img src="examples/view5.png" alt="wrong entry" width="200"> 

## Available conjugations

### Zeitformen

| Tense      | Example (*gehen*, ich) |
|------------|------------------------|
| Präsens    | ich gehe               |
| Präteritum | ich ging               |
| Perfekt    | ich bin gegangen       |
| Futur I    | ich werde gehen        |

## Available verbs

### Verben

| Regular verbs | Irregular verbs | Auxiliary and modal verbs | Separable verbs | Reflexive verbs    |
|---------------|-----------------|---------------------------|-----------------|--------------------|
| machen        | gehen           | sein                      | einkaufen       | sich freuen        |
| spielen       | kommen          | haben                     | aufräumen       | sich setzen        |
| lernen        | fahren          | werden                    | abholen         | sich fühlen        |
| wohnen        | laufen          | können                    | zuhören         | sich beeilen       |
| kaufen        | sehen           | müssen                    | aufmachen       | sich interessieren |
| sagen         | essen           | wollen                    | aufstehen       | sich erinnern      |
| fragen        | trinken         |                           | anrufen         | sich waschen       |
| kochen        | sprechen        |                           | ankommen        | sich treffen       |
| hören         | lesen           |                           | mitkommen       | sich entscheiden   |
| suchen        | schlafen        |                           | mitbringen      | sich anziehen      |
| brauchen      | nehmen          |                           | aussehen        |                    |
| lieben        | geben           |                           | fernsehen       |                    |
| arbeiten      | helfen          |                           | anfangen        |                    |
| warten        | finden          |                           |                 |                    |
| antworten     | schreiben       |                           |                 |                    |
| tanzen        | wissen          |                           |                 |                    |
| reisen        |                 |                           |                 |                    |
| besuchen      |                 |                           |                 |                    |
| bezahlen      |                 |                           |                 |                    |
| wandern       |                 |                           |                 |                    |
| sammeln       |                 |                           |                 |                    |
| ändern        |                 |                           |                 |                    |
| feiern        |                 |                           |                 |                    |

In the settings, regular and irregular verbs have their own toggles (the second and third column both belong to "irregular"). Separable and reflexive verbs are off by default and can be switched on separately.

## Separable and reflexive verbs

- **Separable verbs:** in Präsens and Präteritum the prefix goes to the end, e.g. *ich stehe auf*, *ich kaufte ein*. In Perfekt the prefix is part of the participle (*bin aufgestanden*), and in Futur I the verb stays together (*werde aufstehen*).
- **Reflexive verbs:** type the reflexive pronoun after the verb (accusative), e.g. *ich freue mich*, *du hast dich gefreut*. A verb can be both, e.g. *ich ziehe mich an*.
- Answers are always typed **with** the subject pronoun in front, e.g. *ich gehe*, *wir sind gegangen*. For *er/sie/es* you can type any of the three (*er geht*, *sie geht* or *es geht*), and for the plural *sie* is fine for *sie/Sie*.

## Persons

The app trains all six forms: *ich, du, er/sie/es, wir, ihr, sie/Sie*.

## Interface language

The menus are available in English and Portuguese. You can switch the language with the EN | PT toggle on the start screen or in the options. The app remembers your choice and starts in Portuguese if your browser is set to Portuguese.

## Typing umlauts

You do not need a German keyboard: *ae*, *oe*, *ue* and *ss* are accepted instead of *ä*, *ö*, *ü* and *ß*. If you use such a stand-in, the app shows you the exact spelling afterwards. A missing umlaut (e.g. *fahrst* instead of *fährst*) is still counted as wrong.

## Not (yet) included

- Reflexive verbs with dative pronouns (e.g. *ich wasche mir die Hände*)
- Modal verbs with a second verb in the Perfekt (e.g. *ich habe gehen können*)
- Konjunktiv, Plusquamperfekt, Futur II and the Imperativ

## Want to help on this app? Or you have ideas?

Just make a branch of your own and create a [pull request](https://github.com/philkleer/german-conjugation-react/pulls). If you have just ideas, create an [issue](https://github.com/philkleer/german-conjugation-react/issues). I cannot guarantee that I have time to implement everything, since this is just a hobby.
