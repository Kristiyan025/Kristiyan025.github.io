class WorkExperience {
    constructor({company, durationMonths, isPartOfEducation=false}){
        this.company = company;
        this.durationMonths = durationMonths;
        this.isPartOfEducation = isPartOfEducation;
    }
};

class Skill {
    constructor({
        name, 
        workExperiences, 
        librarySkills = undefined, 
        isLibrary=false, 
        description=undefined,
        badgeImageUrl=undefined,
        link=undefined,
    }) {
        this.name = name;
        this.description = description;
        this.workExperiences = workExperiences;
        this.librarySkills = librarySkills === undefined ? [] : librarySkills;
        this.isLibrary = isLibrary;
        this.badgeImageUrl = badgeImageUrl;
        this.link = link;
        this.totalExperienceDurationMonths = undefined;
    }

    TotalExperienceDurationMonths() {
        if (this.totalExperienceDurationMonths !== undefined) {
            return this.totalExperienceDurationMonths;
        }
        
        return this.totalExperienceDurationMonths = this.workExperiences
            .map(workExp => workExp.durationMonths)
            .reduce((acc, currVal) => acc + currVal, 0);
    }
};

/*    Companies / Schools    */
const SMART_SOFT = `Smart Soft Healthcare`;
const TRADING_212 = `Trading 212`;
const MATH_HIGHSCHOOL = `Math & Science Highschool "Acad. S. Koroliov"`;
const SU_FMI = `Mathematics & Informatics Faculty, Sofia University "St. Kliment Ohridski"`;
const SOFTUNI = `Softuni`;
const IT_KARIERA = `IT Kariera`;
const UDEMI = `Udemy Courses`;
const COMEPTITIVE_PROGRAMMING = `Competitive Programming`;
const AMERICAN_UNI = `American University's Kids/Adults English Program`; 
const SUMMER_AI_CAMP = `Summer AI camp`;
const FREE_TIME = `Free Time`;

const yearsToMonths = (years) => 12 * years;


let skills = {
    'Programming Languages': [
        new Skill({
            name: 'C++', 
            badgeImageUrl: `cpp.png`,
            link: 'https://en.cppreference.com/w/',
            workExperiences: [
                new WorkExperience({company: COMEPTITIVE_PROGRAMMING, durationMonths: yearsToMonths(5), isPartOfEducation: true}),
                new WorkExperience({company: SU_FMI, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
            ],
            librarySkills: [
                new Skill({
                    name: 'STL',
                    badgeImageUrl: `library.png`,
                    link: 'https://en.cppreference.com/w/cpp/standard_library',
                    workExperiences: [
                        new WorkExperience({company: COMEPTITIVE_PROGRAMMING, durationMonths: yearsToMonths(3), isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Boost',
                    description: 'Boost C++ Libraries',
                    badgeImageUrl: `cpp_Boost.png`,
                    link: 'https://www.boost.org/',
                    workExperiences: [
                        new WorkExperience({company: FREE_TIME, durationMonths: 1, isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
            ],
        }),
        new Skill({
            name: 'Python', 
            badgeImageUrl: `python.png`,
            link: 'https://www.python.org/',
            workExperiences: [
                new WorkExperience({company: UDEMI, durationMonths: 3, isPartOfEducation: true}),
                new WorkExperience({company: SMART_SOFT, durationMonths: yearsToMonths(1)}),
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
            librarySkills: [
                new Skill({
                    name: 'Numpy',
                    badgeImageUrl: `python_numpy.png`,
                    link: 'https://numpy.org/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: yearsToMonths(1)}),
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Pandas',
                    badgeImageUrl: `python_pandas.png`,
                    link: 'https://pandas.pydata.org/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: yearsToMonths(1)}),
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Tensorflow',
                    badgeImageUrl: `python_tensorflow.jpg`,
                    link: 'https://www.tensorflow.org/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Keras',
                    badgeImageUrl: `python_keras.png`,
                    link: 'https://keras.io/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: 3}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'scikit-learn',
                    badgeImageUrl: `python_scikit-learn.png`,
                    link: 'https://scikit-learn.org/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: 2}),
                        new WorkExperience({company: TRADING_212, durationMonths: 3}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Matplotlib',
                    badgeImageUrl: `python_matplotlib.png`,
                    link: 'https://matplotlib.org/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: 3}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Flask',
                    badgeImageUrl: `python_flask.png`,
                    link: 'https://flask.palletsprojects.com/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'SQLAlchemy',
                    badgeImageUrl: `python_sqlalchemy.png`,
                    link: 'https://www.sqlalchemy.org/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'PyTest',
                    badgeImageUrl: `python_pytest.png`,
                    link: 'https://docs.pytest.org/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Celery',
                    badgeImageUrl: `python_celery.png`,
                    link: 'https://docs.celeryq.dev/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Requests',
                    badgeImageUrl: `python_requests.png`,
                    link: 'https://requests.readthedocs.io/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Gunicorn',
                    badgeImageUrl: `python_gunicorn.png`,
                    link: 'https://gunicorn.org/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: 1}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Jupiter',
                    badgeImageUrl: `python_jupiter.png`,
                    link: 'https://jupyter.org/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: 2}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Pipenv',
                    badgeImageUrl: `library.png`,
                    link: 'https://pipenv.pypa.io/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'smtplib',
                    badgeImageUrl: `library.png`,
                    link: 'https://docs.python.org/3/library/smtplib.html',
                    workExperiences: [
                        new WorkExperience({company: FREE_TIME, durationMonths: 1, isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
            ],
        }),
        new Skill({
            name: 'C#', 
            badgeImageUrl: `c-sharp.png`,
            link: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
            workExperiences: [
                new WorkExperience({company: MATH_HIGHSCHOOL, durationMonths: yearsToMonths(3), isPartOfEducation: true}),
                new WorkExperience({company: SOFTUNI, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                new WorkExperience({company: IT_KARIERA, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
            ],
            librarySkills: [
                new Skill({
                    name: 'ASP.NET Core',
                    badgeImageUrl: `c-sharp_asp-net-core.png`,
                    link: 'https://dotnet.microsoft.com/en-us/apps/aspnet/',
                    workExperiences: [
                        new WorkExperience({company: SOFTUNI, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                        new WorkExperience({company: IT_KARIERA, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                        new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'EF Core',
                    description: 'Entity Framework Core',
                    badgeImageUrl: `c-sharp_ef-core.png`,
                    link: 'https://learn.microsoft.com/en-us/ef/core/',
                    workExperiences: [
                        new WorkExperience({company: SOFTUNI, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                        new WorkExperience({company: IT_KARIERA, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                        new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'WFA',
                    description: 'Windows Forms App',
                    badgeImageUrl: `library.png`,
                    link: 'https://learn.microsoft.com/en-us/visualstudio/ide/create-csharp-winform-visual-studio',
                    workExperiences: [
                        new WorkExperience({company: MATH_HIGHSCHOOL, durationMonths: yearsToMonths(5), isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
                
            ],
        }),
        new Skill({
            name: 'Java', 
            badgeImageUrl: `java.png`,
            link: 'https://www.java.com/',
            workExperiences: [
                new WorkExperience({company: SU_FMI, durationMonths: 4, isPartOfEducation: true}),
                new WorkExperience({company: TRADING_212, durationMonths: 8}),
            ],
            librarySkills: [
                new Skill({
                    name: 'Spring Boot',
                    badgeImageUrl: `java_spring-boot.png`,
                    link: 'https://spring.io/projects/spring-boot/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: 8}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'NIO API',
                    badgeImageUrl: `library.png`,
                    link: 'https://docs.oracle.com/en/java/javase/21/core/java-nio.html',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: 8}),
                    ],
                    isLibrary: true,
                }),
            ],
        }),
        new Skill({
            name: 'HTML', 
            description: 'Hypertext Markup Language',
            badgeImageUrl: `html.png`,
            link: 'https://www.w3schools.com/html/',
            workExperiences: [
                new WorkExperience({company: MATH_HIGHSCHOOL, durationMonths: yearsToMonths(1), isPartOfEducation: true}),
                new WorkExperience({company: SOFTUNI, durationMonths: 2, isPartOfEducation: true}),
                new WorkExperience({company: IT_KARIERA, durationMonths: 1, isPartOfEducation: true}),
                new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(6), isPartOfEducation: true}),
                new WorkExperience({company: TRADING_212, durationMonths: 1}),
            ],
        }),
        new Skill({
            name: 'CSS', 
            description: 'Cascading Style Sheets',
            badgeImageUrl: `css.png`,
            link: 'https://www.w3schools.com/css/',
            workExperiences: [
                new WorkExperience({company: MATH_HIGHSCHOOL, durationMonths: yearsToMonths(1), isPartOfEducation: true}),
                new WorkExperience({company: SOFTUNI, durationMonths: 2, isPartOfEducation: true}),
                new WorkExperience({company: IT_KARIERA, durationMonths: 1, isPartOfEducation: true}),
                new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(6), isPartOfEducation: true}),
                new WorkExperience({company: TRADING_212, durationMonths: 1}),
            ],
        }),
        new Skill({
            name: 'JS', 
            description: 'Javascript',
            badgeImageUrl: `js.png`,
            link: 'https://www.w3schools.com/js/',
            workExperiences: [
                new WorkExperience({company: SOFTUNI, durationMonths: 2, isPartOfEducation: true}),
                new WorkExperience({company: IT_KARIERA, durationMonths: 2, isPartOfEducation: true}),
                new WorkExperience({company: FREE_TIME, durationMonths: 6, isPartOfEducation: true}),
                new WorkExperience({company: SU_FMI, durationMonths: 4, isPartOfEducation: true}),
                new WorkExperience({company: TRADING_212, durationMonths: 2}),
            ],
            librarySkills: [
                new Skill({
                    name: 'Node JS',
                    badgeImageUrl: `js_node-js.png`,
                    link: 'https://nodejs.org/',
                    workExperiences: [
                        new WorkExperience({company: SOFTUNI, durationMonths: 3, isPartOfEducation: true}),
                        new WorkExperience({company: TRADING_212, durationMonths: 2}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'Three.js',
                    badgeImageUrl: `js_three-js.png`,
                    link: 'https://threejs.org/',
                    workExperiences: [
                        new WorkExperience({company: SU_FMI, durationMonths: 4, isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
                new Skill({
                    name: 'p5.js',
                    description: '(Processing based)',
                    badgeImageUrl: `js_p5-js.png`,
                    link: 'https://p5js.org/',
                    workExperiences: [
                        new WorkExperience({company: FREE_TIME, durationMonths: 4, isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
            ],
        }),
        new Skill({
            name: 'Processing', 
            description: '(Java based)',
            badgeImageUrl: `processing.png`,
            link: 'https://processing.org/',
            workExperiences: [
                new WorkExperience({company: FREE_TIME, durationMonths: 6, isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'GLSL', 
            badgeImageUrl: `glsl.png`,
            link: 'https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)',
            workExperiences: [
                new WorkExperience({company: FREE_TIME, durationMonths: 4, isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'C', 
            badgeImageUrl: `c.png`,
            link: 'https://www.w3schools.com/c/',
            workExperiences: [
                new WorkExperience({company: SU_FMI, durationMonths: 4, isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'Haskell', 
            badgeImageUrl: `haskell.png`,
            link: 'https://www.haskell.org/',
            workExperiences: [
                new WorkExperience({company: IT_KARIERA, durationMonths: 4, isPartOfEducation: true}),
                new WorkExperience({company: SU_FMI, durationMonths: 6, isPartOfEducation: true}),
            ],
            librarySkills: [
                new Skill({
                    name: 'Cabal',
                    badgeImageUrl: `haskell_cabal.png`,
                    link: 'https://www.haskell.org/cabal/',
                    workExperiences: [
                        new WorkExperience({company: SOFTUNI, durationMonths: 3, isPartOfEducation: true}),
                    ],
                    isLibrary: true,
                }),
            ],
        }),
        new Skill({
            name: 'Scheme', 
            badgeImageUrl: `scheme.png`,
            link: 'https://www.scheme.org/',
            workExperiences: [
                new WorkExperience({company: SU_FMI, durationMonths: 6, isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'Prolog', 
            description: 'A logic programming language',
            badgeImageUrl: `prolog.png`,
            link: 'https://www.swi-prolog.org/',
            workExperiences: [
                new WorkExperience({company: SUMMER_AI_CAMP, durationMonths: 0.5, isPartOfEducation: true}),
            ],
        }),
        
    ],
    'Databases': [
        new Skill({
            name: 'MySQL', 
            badgeImageUrl: `mysql.png`,
            link: 'https://www.mysql.com/',
            workExperiences: [
                new WorkExperience({company: IT_KARIERA, durationMonths: 3, isPartOfEducation: true}),
                new WorkExperience({company: SMART_SOFT, durationMonths: 6}),
                new WorkExperience({company: TRADING_212, durationMonths: 8}),
            ],
        }),
        new Skill({
            name: 'T-SQL', 
            description: 'Transact SQL - Microsoft SQL Server (MS SQL)',
            badgeImageUrl: `ms-sql.png`,
            link: 'https://www.javatpoint.com/t-sql',
            workExperiences: [
                new WorkExperience({company: SOFTUNI, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                new WorkExperience({company: IT_KARIERA, durationMonths: yearsToMonths(1), isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'MariaDB',
            badgeImageUrl: `maria-db.png`,
            link: 'https://mariadb.org/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
        new Skill({
            name: 'InfluxDB',
            badgeImageUrl: `influx-db.png`,
            link: 'https://www.influxdata.com/',
            workExperiences: [
                new WorkExperience({company: SMART_SOFT, durationMonths: 1}),
            ],
        }),
        new Skill({
            name: 'PostgreSQL',
            badgeImageUrl: `postgresql.png`,
            link: 'https://www.postgresql.org/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
        new Skill({
            name: 'SQLite',
            badgeImageUrl: `sqlite.png`,
            link: 'https://www.sqlite.org/',
            workExperiences: [
                new WorkExperience({company: SMART_SOFT, durationMonths: 6}),
            ],
        }),
        new Skill({
            name: 'Redis',
            badgeImageUrl: `redis.png`,
            link: 'https://redis.io/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
        new Skill({
            name: 'Elasticsearch',
            badgeImageUrl: `elasticsearch.png`,
            link: 'https://www.elastic.co/elasticsearch',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
        new Skill({
            name: 'Cassandra',
            description: 'Apache Cassandra',
            badgeImageUrl: `apache-cassandra.png`,
            link: 'https://cassandra.apache.org/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: 6}),
            ],
        }),
        new Skill({
            name: 'AWS Keyspaces',
            description: 'AWS equivalent of Cassandra. Less capability.',
            badgeImageUrl: `aws-keyspaces.png`,
            link: 'https://aws.amazon.com/keyspaces/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: 6}),
            ],
        }),
        new Skill({
            name: 'TimescaleDB',
            badgeImageUrl: `timescale-db.jpg`,
            link: 'https://www.timescale.com/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
        new Skill({
            name: 'ClickHouse',
            description: 'Fast Open-Source OLAP DBMS',
            badgeImageUrl: `clickhouse.png`,
            link: 'https://clickhouse.com/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
        new Skill({
            name: 'Firebase Realtime DB',
            badgeImageUrl: `firebase.png`, 
            link: 'https://firebase.google.com/',
            workExperiences: [
                new WorkExperience({company: SOFTUNI, durationMonths: 1, isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'Google Cloud Firestore', 
            badgeImageUrl: `firestore.png`,
            link: 'https://firebase.google.com/docs/firestore',
            workExperiences: [
                new WorkExperience({company: SOFTUNI, durationMonths: 1, isPartOfEducation: true}),
            ],
        }),
        
    ],
    'General technologies': [
        new Skill({
            name: 'Git', 
            badgeImageUrl: `git.png`,
            link: 'https://git-scm.com/',
            workExperiences: [
                new WorkExperience({company: SOFTUNI, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                new WorkExperience({company: IT_KARIERA, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(1), isPartOfEducation: true}),
                new WorkExperience({company: SMART_SOFT, durationMonths: yearsToMonths(1)}),
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
            librarySkills: [
                new Skill({
                    name: 'Github', 
                    badgeImageUrl: `github.png`,
                    link: 'https://github.com/',
                    workExperiences: [
                        new WorkExperience({company: SOFTUNI, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                        new WorkExperience({company: IT_KARIERA, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                        new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(1), isPartOfEducation: true}),
                    ],
                }),
                new Skill({
                    name: 'GitLab', 
                    badgeImageUrl: `gitlab.png`,
                    link: 'https://about.gitlab.com/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                }),
                new Skill({
                    name: 'Gitea', 
                    description: 'Software for hosting repositories',
                    badgeImageUrl: `gitea.png`,
                    link: 'https://about.gitea.com/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: yearsToMonths(1)}),
                    ],
                }),
                new Skill({
                    name: 'Git Extensions', 
                    description: 'Windows GUI client for Git',
                    badgeImageUrl: `git-extensions.png`,
                    link: 'https://gitextensions.github.io/',
                    workExperiences: [
                        new WorkExperience({company: SMART_SOFT, durationMonths: yearsToMonths(1)}),
                        new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(1), isPartOfEducation: true}),
                    ],
                }),
                new Skill({
                    name: 'Github Desktop', 
                    description: 'GUI client for Git',
                    badgeImageUrl: `github-desktop.png`,
                    link: 'https://github.com/apps/desktop',
                    workExperiences: [
                        new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(3), isPartOfEducation: true}),
                    ],
                }),
                new Skill({
                    name: 'SourceTree', 
                    description: 'GUI client for Git',
                    badgeImageUrl: `sourcetree.png`,
                    link: 'https://www.sourcetreeapp.com/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
                    ],
                }),
                new Skill({
                    name: 'GitKraken Desktop', 
                    description: 'GUI client for Git',
                    badgeImageUrl: `gitkraken.png`,
                    link: 'https://www.gitkraken.com/',
                    workExperiences: [
                        new WorkExperience({company: TRADING_212, durationMonths: 2}),
                    ],
                }),
            ]
        }),
        new Skill({
            name: 'Kafka', 
            description: 'Apache Kafka',
            badgeImageUrl: `apache-kafka.png`,
            link: 'https://kafka.apache.org/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
        new Skill({
            name: 'AWS', 
            description: 'Amazon Web Services',
            badgeImageUrl: `aws.png`,
            link: 'https://aws.amazon.com/',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: 9}),
            ],
        }),
        new Skill({
            name: 'Google Cloud Console && VMs', 
            badgeImageUrl: `google-cloud.png`,
            link: 'https://cloud.google.com/',
            workExperiences: [
                new WorkExperience({company: SMART_SOFT, durationMonths: 4}),
                new WorkExperience({company: TRADING_212, durationMonths: 2}),
            ],
        }),
        new Skill({
            name: 'Kibana', 
            badgeImageUrl: `kibana.png`,
            link: 'https://firebase.google.com/docs/firestore',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
        new Skill({
            name: 'Grafana', 
            badgeImageUrl: `grafana.png`,
            link: 'https://www.elastic.co/kibana',
            workExperiences: [
                new WorkExperience({company: TRADING_212, durationMonths: 2}),
            ],
        }),
    ],
    'Design Programs': [
        new Skill({
            name: 'Adobe Photoshop', 
            badgeImageUrl: `adobe-photoshop.png`,
            link: 'https://www.adobe.com/products/photoshop.html',
            workExperiences: [
                new WorkExperience({company: FREE_TIME, durationMonths: 4, isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'Adobe Illustrator', 
            badgeImageUrl: `adobe-illustrator.png`,
            link: 'https://www.adobe.com/products/illustrator.html',
            workExperiences: [
                new WorkExperience({company: FREE_TIME, durationMonths: 1, isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'Procreate', 
            description: 'Drawing app for iPad',
            badgeImageUrl: `procreate.png`,
            link: 'https://procreate.com/',
            workExperiences: [
                new WorkExperience({company: FREE_TIME, durationMonths: 6, isPartOfEducation: true}),
            ],
        }),
    ],
    'Spoken Languages': [
        new Skill({
            name: 'Bulgarian', 
            badgeImageUrl: `bg.png`,
            workExperiences: [
                new WorkExperience({company: MATH_HIGHSCHOOL, durationMonths: yearsToMonths(12), isPartOfEducation: true}),
                new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(7), isPartOfEducation: true}),
            ],
        }),
        new Skill({
            name: 'English',
            badgeImageUrl: `en.png`,
            workExperiences: [
                new WorkExperience({company: MATH_HIGHSCHOOL, durationMonths: yearsToMonths(2), isPartOfEducation: true}),
                new WorkExperience({company: AMERICAN_UNI, durationMonths: yearsToMonths(4), isPartOfEducation: true}),
                new WorkExperience({company: FREE_TIME, durationMonths: yearsToMonths(3), isPartOfEducation: true}),
                new WorkExperience({company: SMART_SOFT, durationMonths: 3}),
                new WorkExperience({company: TRADING_212, durationMonths: yearsToMonths(1)}),
            ],
        }),
    ],
};