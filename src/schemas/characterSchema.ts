import Joi from 'joi';

export const createCharacterSchema = Joi.object({
    name: Joi.string().trim().required(),
    race: Joi.string()
        .trim()
        .valid('Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-elf', 'Half-orc', 'Halfling', 'Human', 'Tiefling')
        .required(),
    class: Joi.string()
        .trim()
        .valid('Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard')
        .required(),
    picture: Joi.string().trim().uri(),
});
