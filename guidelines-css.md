# Bonnes pratiques et notes générales sur CSS

## Source

Ce guide est un fork d'une traduction de [CSS-Guidelines](https://github.com/csswizardry/CSS-Guidelines)

---

En travaillant sur des projets d'envergure fonctionnant avec des dizaines de développeurs, il est important de travailler de façon unifiée avec pour objectif de :

* Garder les feuilles de style maintenables
* Garder le code transparent et lisible
* Garder les feuilles de style extensibles

Pour satisfaire ces objectifs, il existe plusieurs techniques à employer.

La première partie de ce document traitera de la syntaxe, du formatage et de la taxonomie CSS.
La deuxième partie traitera de l'approche, l'état d'esprit et l'attitude à avoir pour écrire et architecturer du CSS.


## Contenu

* [Anatomie d'un document CSS](#anatomie-dun-document-css)
  * [Généralités](#gnralits)
  * [Un seul fichier ou plusieurs fichiers ?](#un-seul-fichier-ou-plusieurs-fichiers-)
  * [Table des matières](#table-des-matires)
  * [Titre de section](#titres-de-section)
* [Ordre des sources](#ordre-des-sources)
* [Anatomie d'une règle](#anatomie-dune-rgle)
* [Classes en HTML](#classes-en-html)
* [Convention de nommage](#convention-de-nommage)
  * [Classes en HTML](#classes-en-html)
  * [Ancres javascript](#ancres-javascript)
  * [Localisation](#localisation)
* [Commentaires](#commentaires)
  * [Commentaires sous stéroïdes](#commentaires-sous-strodes)
  * [Sélecteurs spécifiques](#selecteurs-specifiques)
  * [Code des balises](#code-des-balises)
  * [Association des objets](#association-des-objets)
* [Ecrire du CSS](#ecrire-du-css)
* [Construire de nouveaux composants](#construire-de-nouveau-composants)
* [CSSOO](#cssoo)
* [Mise en page](#mise-en-page)
* [Taille des interfaces](#taille-des-interfaces)
  * [Taille des polices](#taille-des-polices)
* [Raccourcis](#raccourcis)
* [IDs](#ids)
* [Sélecteurs](#selecteurs)
  * [Sur-qualification des sélecteurs](#sur-qualification-des-selecteurs)
  * [Performance des sélecteurs](#performance-des-selecteurs)
* [L'intention de sélection](#lintention-de-selection)
* [`!important`](#important)
* [Nombres magiques et absolus](#nombres-magiques-et-absolus)
* [Styles conditionnels](#styles-conditionnels)
* [Débogage](#debogage)
* [Pré-processeurs](#pre-processeurs)

---

## Anatomie d'un document CSS

Peu importe le document, il faut toujours essayer de garder un formatage commun.
Cela signifie une cohérence des commentaires, de la syntaxe et des règles de nommage.

### Généralités

Concernant l'indentation, préfèrer 1 tabulation au lieu des espaces et écrire
des CSS multilignes.

### Table des matières

Au sommet des feuilles de style, je maintiens une table des matières qui
détaillera les sections contenues dans le document, par exemple :

    /*
    * COMPONENTS
    * ----------
    *
    * Browser................Style relatifs aux navigateurs (sélection, taps)
    * Typo...................Alignements, masquages
    * Clearfix...............Créer un conxtexte de formatage
    * Grid...................Grille
    * Forms..................Formulaires
    * Responsive.............Responsive Web Design
    * Components.............Composants utilisés
    */

Ceci va permettre au prochain développeur de savoir exactement ce qu'il va
trouver dans ce fichier. Chaque élément de la table des matières correspond
directement à un titre de section.

Si vous travaillez sur une grande feuille de style, la section correspondante
sera également dans ce fichier. Si vous travaillez sur plusieurs fichiers,
chaque élément de la table des matières correspondra à une inclusion.



### Titres de section

La table des matières n'est d'aucune utilité si elle ne possède pas de section
correspondante. Les sections sont désignées ainsi :

    /* ----------------------------------------------------------------------------
       $Section
    ---------------------------------------------------------------------------- */

Le préfixe `$` dans une section permet de faire une recherche rapide
([Cmd|Ctrl]+F ou ([Ctrl|Shift]+F))

Si vous travaillez dans une grande feuille de style, laissez cinq 5 retours
chariot entre chaque section, comme ceci :

    /*------------------------------------*\
        $Section1
    \*------------------------------------*/
    [Vos
    styles
    par défaut]





    /*------------------------------------*\
        $Section2
    \*------------------------------------*/

Cet espacement est rapidement perceptible lorsque vous faites défiler des
fichiers plus volumineux.

Si vous travaillez sur plusieurs feuilles de styles, démarrez chacun de ces
fichiers avec un titre de section. Il n'est pas nécessaire d'inclure des
retours chariot.

## Ordre des sources

Essayez d'écrire des feuilles de style dans leur ordre de spécificité. Cela
garantit que vous conservez l'avantage de l'héritage ainsi que le <i>C</i> du
CSS qui signifie cascade.

Une feuille de style bien ordonnée ressemblera à ceci :

1. **Reset** – réinitialisation des propriétés.
2. **Elements** – propriétés de bases `h1`, `ul` etc.
3. **Objets et abstractions** — patrons de conception génériques.
4. **Composants** – composants complets construits à partir d'objets et de leurs extensions.
5. **Atouts de style** – états des erreurs etc.

Cela signifie que lorsque vous descendez dans le document, chaque section
s'appuie et hérite de la précédente. Il devrait y avoir moins d'annulations de
styles, moins de problèmes de spécificité, moins de créations de style tous
azimuts et une meilleure architecture de vos feuilles.


## Anatomie d'une règle

    [selecteur] {
        [propriété]: [valeur];
        [<- Déclaration ->]
    }

J'applique un certain nombre de normes concernant la structure des règles CSS.

* 1 tabulation d'indentation
* Multi-ligne
* Toujours inclure le point-virgule final

Un petit exemple :

    .widget {
        padding: 10px;
        border: 1px solid #BADA55;
        background-color: #C0FFEE;
        -webkit-border-radius: 4px;
           -moz-border-radius: 4px;
                border-radius: 4px;
    }
        .widget-heading {
            font-size: 1.5rem;
            line-height: 1;
            font-weight: bold;
            color: #BADA55;
            margin-right: -10px;
            margin-left:  -10px;
            padding:0.25em;
        }

Ici, nous pouvons voir que `.widget-heading` doit être un enfant de `.widget`
que nous avons indenté `.widget-heading` d'un niveau plus profond que
`.widget`.
C'est une information utile pour les développeurs qui peut être scannée
seulement d'un coup d'oeil suivant l'indentation de notre ensemble de règles.

Une exception à notre règle multi-lignes pourrait être dans le cas suivant :

    .t10    { width:10% }
    .t20    { width:20% }
    .t25    { width:25% }       /* 1/4 */
    .t30    { width:30% }
    .t33    { width:33.333% }   /* 1/3 */
    .t40    { width:40% }
    .t50    { width:50% }       /* 1/2 */
    .t60    { width:60% }
    .t66    { width:66.666% }   /* 2/3 */
    .t70    { width:70% }
    .t75    { width:75% }       /* 3/4*/
    .t80    { width:80% }
    .t90    { width:90% }

Dans cet exemple, il est plus logique de tout concentrer sur une seule ligne.


## Convention de nommage

* Utiliser `-` pour délimiter les noms de classe
* Assurez-vous de toujours nommer vos classes judicieusement ; garder un nom
aussi court que possible, mais aussi long que nécessaire. S'assurer que les
objets ou les abstractions sont très vaguement nommés (par exemple `.ui-list`,
`.media`) pour permettre une meilleure réutilisation. Les extensions des objets
devraient être nommées beaucoup plus explicitement (par exemple
`.user-avatar-link`). Ne vous inquiétez pas de la taille de vos classes, gzip
compresse le code bien écrit _incroyablement_ bien.


### Ancres Javascript

**N'utilisez jamais une classe de _style_ CSS pour vos Javascript**
Associer un comportement javascript à une classe de style signifie que nous ne
pourrons jamais avoir l'un sans l'autre. *Préférer les id html* pour exécuter
un JavaScript.

Si vous avez besoin de se lier un évènement à une balise, créez plutôt une
classe dédiée dans votre CSS.
Il s'agit simplement d'une classe avec un nommage `.js-` par exemple,
`.js-toggle`, `.js-drag-and-drop`. Cela signifie que nous pouvons joindre les
deux classes JS et CSS pour notre balisage, sans avoir de chevauchements
gênants.

    <th class="is-sortable  js-is-sortable">
    </th>

Le balisage ci-dessus contient deux classes ; la première est associée au style
du tableau, la deuxième à une fonction de tri.


### Commentaires sous stéroïdes

Il y a un certain nombre de techniques plus avancées que vous pouvez employer
en ce qui concerne les commentaires, à savoir :

* Les sélecteurs spécifiques
* l'association des objets


#### Sélecteurs spécifiques

Vous ne devriez jamais qualifier vos sélecteurs, c'est-à-dire que nous ne
devrions jamais écrire `ul.nav{}` si vous pouvez juste avoir `.nav`. Qualifier
vos sélecteurs diminue leur rendement, inhibe le potentiel de réutilisation
d'un objet sur un autre type d'élément et augmente la spécificité du sélecteur.
Ce sont toutes des choses qui doivent être évitées à tout prix.

Cependant, il est parfois utile de communiquer à d'autre(s) développeur(s) où
vous avez l'intention d'utiliser une classe. Prenons `.product-page` par
exemple, cette classe sonne comme si elle était utilisée sur un conteneur
de haut niveau, peut-être avec `html` ou `body`, mais seulement avec `.product-page` il est impossible de le savoir.

Par quasi-qualification de ce sélecteur (autrement dit en commentant le
sélecteur de premier plan), nous pouvons communiquer nos intentions pour cette
classe :

    /*html*/.product-page{}

Nous pouvons maintenant voir exactement où s'applique cette classe, sans avoir
les inconvénients de la la spécificité ou de la non-réutilisation.

D'autres exemples pourraient être: :

    /*ol*/.breadcrumb{}
    /*p*/.intro{}
    /*ul*/.image-thumbs{}

Dans ces cas, nous savons le contexte d'utilisation de ces classes sans jamais
impacter la spécificité des sélecteurs


#### Association des objets

Lorsque l'on travaille d'une manière orientée objet, vous aurez souvent deux
morceaux de CSS (l'un étant le squelette (l'objet) et l'autre étant la peau
(l'extension)) qui sont très étroitement liés, mais qui vivent dans des endroits
très différents.
Afin d'établir un lien béton entre l'objet et son extension nous utiliserons des
*pointeurs objet / extension*. Ce sont simplement des commentaires comme ceci :

Dans votre feuille de style de base :

    /**
     * Extend `.foo` in theme.css
     */
     .foo{}

Dans votre feuille de style de thème :

    /**
     * Extends `.foo` in base.css
     */
     .bar{}

Ici, nous avons établi une relation concrète entre deux morceaux de code très
distincts.

---

## Mise en page

Tous les composants que vous créez doivent être laissés totalement libres de
largeurs, ils doivent toujours rester fluides et leurs largeurs doivent être
régies par un système de parent / de grille.

Les hauteurs ne doivent **jamais** être appliquées aux éléments. Les hauteurs
ne devraient être appliquées qu'à des éléments qui avaient des dimensions
_avant_ leur intégration sur le site (autrement dit les images et des sprites).
Ne jamais mettre de hauteurs sur les balises `p`, `ul`, `div`, ou n'importe
quoi d'autre.
Vous pouvez souvent obtenir l'effet désiré avec `line-height` qui est beaucoup
plus souple.

Les systèmes de grilles devraient être considérées comme des étagères. Ils
contiennent du contenu, mais ne sont pas du contenu eux-mêmes. Vous mettez en
place vos étagères puis les remplissez avec vos objets.
En mettant en place nos grilles séparément de nos composants, vous pourrez les
déplacer beaucoup plus facilement que s'ils avaient des dimensions associées,
ce qui rend notre front-end beaucoup plus souple et rapide à utiliser.

Vous ne devriez jamais appliquer du style à un élément de la grille, ces
derniers s'utilisent uniquement pour notre mise en page. Appliquez un style
au contenu _à l'intérieur_ d'un élément de grille.
## Taille des interfaces

Les systèmes de grilles devraient, idéalement, être mis en pourcentage. Parce
que j'utilise les systèmes de grille pour gouverner la largeur des colonnes
et des pages, je peux laisser les objets totalement libres de dimensions.

J'utilise seulement les pixels pour les objets dont les dimensions sont fixées.
Cela inclut des choses comme les images et les sprites dont les dimensions sont
en pixels.


## Raccourcis

**Les raccourcis CSS doivent être utilisés avec prudence.**

Il peut être tentant d'utiliser des déclarations comme `background: red;` mais
en faisant cela, ce que vous êtes en train de coder est : « Je ne veux pas
d'image de fond qui défile, aligné en haut à gauche, répété en X et Y, avec une
couleur de fond de rouge ». Neuf fois sur dix, cela n'entraînera pas de
problèmes, mais dans ce cas-là il est justifié de ne pas utiliser de raccourci.
En remplacement, utilisez `background-color: red;`.

De même, les déclarations comme `margin: 0;` sont agréables et courtes, mais
**restez explicite**. Si vous voulez réellement n'affecter la marge que sur le
bas d'un élément, il est plus approprié d'utiliser `margin-bottom: 0;`.

Soyez explicite dans les propriétés que vous définissez et prenez soin de ne
pas, par inadvertance, en écraser d'autres avec un raccourci. Par exemple si
vous ne voulez pas supprimer la marge inférieure sur un élément alors il n'y
a aucun sens à la mise à zéro toutes les marges avec `margin: 0;`.

Les raccourcis sont une bonne chose mais ils sont trop facilement usurpés.

## IDs

Une note rapide sur les identifiants en CSS avant de nous plonger dans les
sélecteurs en général.

**Ne JAMAIS utiliser des ID en CSS.**

Ils peuvent être utilisés dans votre balisage pour de l'identification en JS,
mais pour styler vos éléments, utilisez seulement des classes.
Vous ne voulez pas voir un seul identifiant dans tous vos styles !

Les classes ont l'avantage d'être réutilisable (même si nous ne voulons pas,
nous pouvons) et ils ont une belle et faible spécificité. La spécificité est
l'une des façons les plus rapides de rencontrer des difficultés dans les
projets et la maintenir à un faible niveau en tout temps est impératif. Un ID
est **255** fois plus précis qu'une classe, donc ne les utilisez _jamais_ en
CSS _jamais_.


## Sélecteurs

Gardez les sélecteurs courts, efficaces et portables.

Les sélecteurs basés sur la position sont mauvais pour un certain nombre de
raisons. Par exemple, prenez `.sidebar h3 span{}`. Ce sélecteur est trop basé
sur la position et donc ne nous permet pas de déplacer un `span` en dehors d'un
`h3` sans casser le style.

Les sélecteurs trop longs introduisent également des problèmes de performance ;
plus il y a de niveau dans un sélecteur (par exemple `.sidebar h3 span` a trois
niveaux, `.content ul p a` en a quatre), plus le navigateur a de traitements à effectuer.

Assurez-vous que les styles soient indépendants de la position lorsque cela est
possible, et assurez-vous qu'ils soient simples et courts.

Les sélecteurs doivent être courts (par exemple, un niveau d'une classe de
profondeur) mais les noms de classe eux-mêmes devraient être aussi longs que
possible. Une classe `.user-avatar` est bien plus agréable que `.usr-avt`.

**Rappelez-vous :** les classes ne sont ni sémantiques ni non-sémantiques !
Arrêter de stresser sur les noms de classe « sémantique » et choisissez quelque
chose de simple à l'épreuve du temps.


### Sur-qualification des sélecteurs

Comme indiqué plus haut, les chaînes de sélecteurs sont de mauvaises nouvelles.

Une sur-qualification des sélecteurs ressemble à `div.promo`. Vous obtiendrez
sûrement le même résultat en utilisant simplement `.promo`. Bien sûr, dans
certains cas vous _voulez_ associer une classe avec un élément. Exemple : vous
avez une classe générique `.error` qui a besoin d'avoir un aspect différent en
fonction de son élément (par exemple,
`.error {color: red;}` et `div.error {padding: 14px;}`). Généralement, essayez
d'éviter lorsque cela est possible.

Un autre exemple d'un sélecteur sur-qualifié pourrait être `ul.nav li a {}`.
Comme ci-dessus, nous pouvons supprimer `ul` puisque nous savons que `.nav` est
une liste, il est aussi logique que `a` _doit_ être dans un `li`, donc nous
mettre à la diète `ul.nav li a {}` pour obtenir simplement `.nav a{}`.


### Performance des sélecteurs

S'il est vrai que les navigateurs ne pourront pas continuer à interpréter
encore plus rapidement le CSS, l'efficacité est quelque chose que vous pourriez
garder en tête. En résumé, évitez les sélecteurs non imbriquées, l'universel
(`*{}`), ainsi que les sélecteurs CSS3 plus complexes devraient permettre de
contourner ces problèmes.


## L'intention de sélection

Au lieu d'utiliser les sélecteurs pour cibler un élément du DOM, il est souvent
préférable de mettre une classe sur l'élément que vous voulez explicitement
styler. Prenons l'exemple précis d'un sélecteur comme `.header ul{}` ...

Imaginons que `ul` est en effet le menu principal de notre site Web. il vit dans
l'en-tête et vous pensez que se sera le seul `ul` en ces lieux ; `.header ul{}`
fonctionnera, mais ce n'est pas idéal ou souhaitable.
Ce n'est pas à l'épreuve du temps et certainement pas assez explicite. Dès que
nous ajouterons un autre `ul` pour cet en-tête il va adopter le style de notre
navigation principale.
Il y a beaucoup de chances que ce ne soit pas voulu. Cela signifie que nous
devons soit remanier une grande quantité de code _ou_ annuler beaucoup de
styles sur les `ul`s dans ce `.header` pour supprimer les effets de la
sélection globale.

L'intention de votre sélecteur doit correspondre à la raison de votre style ;
demandez-vous **'Est-ce-que je sélectionne cela car c'est un `ul` à l'intérieur
de `.header` ou parce que c'est la navigation principale de mon site ?'**.
La réponse à cette question permettra de déterminer votre sélecteur.

Assurez-vous que votre sélecteur clé n'est jamais un élément / type ou
une classe abstraite. Vous ne voulez pas vraiment voir comme sélecteurs
`.sidebar ul{}` ou `.footer .media{}` dans votre feuille de thème.

Soyez explicites ; ciblez l'élément que vous voulez modifier, pas son parent.
Ne supposez jamais que le balisage ne changera pas. **Codez des sélecteurs qui
ciblent ce que vous voulez, pas ce qui se trouve être déjà là.**


## `!important`

Il est correct d'utiliser `!important` sur des classes d'assistance uniquement.
Vous pouvez aussi faire de la prévention en ajoutant `!important` dans le cas
où vous savez que la règle sera **toujours ** prioritaire, par exemple
`.error {color: red !important;}`.

Utiliser `!important` pour sortir d'une situation périlleuse n'est pas
conseillé. Retravaillez votre CSS et essayez de lutter contre ces problèmes en
_refactorant_ vos sélecteurs. Garder vos sélecteurs courts en évitant les IDS
vous aidera énormément.


## Styles conditionnels

Les feuilles de style IE peuvent, généralement, être totalement évitées. La
seule fois où une feuille de style IE peut être nécessaire est de contourner
le manque flagrant de fonctionnalités (une correction des PNG par exemple).

En règle générale, toutes les règles de mise en page et le modèle de boîte
_devraient_ fonctionner sans feuille de style IE si vous réusinez et
retravaillez votre CSS.
Cela signifie que vous ne rencontrerez plus jamais
`<!--[if IE 7]>element{ margin-left:-9px; } < ![endif]-->` ou un autre
CSS clairement utilisé de façon arbitraire simplement « parce que ça fonctionne ».


