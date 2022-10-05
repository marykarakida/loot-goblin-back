import axios from 'axios';
import { faker } from '@faker-js/faker';

import prisma from '../src/database';

const DND_API = 'https://www.dnd5eapi.co/api';

async function main() {
    //
    // classes
    //
    await prisma.class.createMany({
        data: [
            { name: 'Barbarian', icon: 'https://i.imgur.com/izeK1Py.png' },
            { name: 'Bard', icon: 'https://i.imgur.com/SjD0TDy.png' },
            { name: 'Cleric', icon: 'https://i.imgur.com/Ns4op2a.png' },
            { name: 'Druid', icon: 'https://i.imgur.com/mVeBkwF.png' },
            { name: 'Fighter', icon: 'https://i.imgur.com/VmOxMtI.png' },
            { name: 'Monk', icon: 'https://i.imgur.com/1MzgkLc.png' },
            { name: 'Paladin', icon: 'https://i.imgur.com/kBoheDD.png' },
            { name: 'Ranger', icon: 'https://i.imgur.com/oaEAeoQ.png' },
            { name: 'Rogue', icon: 'https://i.imgur.com/5Dy4qb5.png' },
            { name: 'Sorcerer', icon: 'https://i.imgur.com/a6mkvD5.png' },
            { name: 'Warlock', icon: 'https://i.imgur.com/z2BSBPm.png' },
            { name: 'Wizard', icon: 'https://i.imgur.com/l3BqKMc.png' },
        ],
        skipDuplicates: true,
    });

    //
    // races
    //
    await prisma.race.createMany({
        data: [
            { name: 'Dragonborn' },
            { name: 'Dwarf' },
            { name: 'Elf' },
            { name: 'Gnome' },
            { name: 'Half-elf' },
            { name: 'Half-orc' },
            { name: 'Halfling' },
            { name: 'Human' },
            { name: 'Tiefling' },
        ],
        skipDuplicates: true,
    });

    //
    // categories & equipments
    //
    const {
        data: { equipment: adventuringGears },
    } = await axios.get(`${DND_API}/equipment-categories/adventuring-gear`);

    const adventuringGearsList = adventuringGears.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Adventuring Gear',
        picture: faker.image.business(400, 400, true),
    }));

    const {
        data: { equipment: lightArmors },
    } = await axios.get(`${DND_API}/equipment-categories/light-armor`);

    const lightArmorsList = lightArmors.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Light Armor',
        picture: faker.image.fashion(400, 400, true),
    }));

    const {
        data: { equipment: mediumArmors },
    } = await axios.get(`${DND_API}/equipment-categories/medium-armor`);

    const mediumArmorsList = mediumArmors.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Medium Armor',
        picture: faker.image.fashion(400, 400, true),
    }));

    const {
        data: { equipment: heavyArmors },
    } = await axios.get(`${DND_API}/equipment-categories/heavy-armor`);

    const heavyArmorsList = heavyArmors.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Heavy Armor',
        picture: faker.image.fashion(400, 400, true),
    }));

    const {
        data: { equipment: shields },
    } = await axios.get(`${DND_API}/equipment-categories/shields`);

    const shieldsList = shields.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Shield',
        picture: faker.image.city(400, 400, true),
    }));

    const {
        data: { equipment: martialMeleeWeapons },
    } = await axios.get(`${DND_API}/equipment-categories/martial-melee-weapons`);

    const martialMeleeWeaponsList = martialMeleeWeapons.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Martial Melee Weapon',
        picture: faker.image.animals(400, 400, true),
    }));

    const {
        data: { equipment: simpleMeleeWeapons },
    } = await axios.get(`${DND_API}/equipment-categories/simple-melee-weapons`);

    const simpleMeleeWeaponsList = simpleMeleeWeapons.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Simple Melee Weapon',
        picture: faker.image.animals(400, 400, true),
    }));

    const {
        data: { equipment: martialRangedWeapons },
    } = await axios.get(`${DND_API}/equipment-categories/martial-ranged-weapons`);

    const martialRangedWeaponsList = martialRangedWeapons.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Martial Ranged Weapon',
        picture: faker.image.cats(400, 400, true),
    }));

    const {
        data: { equipment: simpleRangedWeapons },
    } = await axios.get(`${DND_API}/equipment-categories/simple-ranged-weapons`);

    const simpleRangedWeaponsList = simpleRangedWeapons.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Simple Ranged Weapon',
        picture: faker.image.cats(400, 400, true),
    }));

    const {
        data: { equipment: potions },
    } = await axios.get(`${DND_API}/equipment-categories/potion`);

    const potionsList = potions.map((equipment: any) => ({
        name: equipment.name,
        categoryName: 'Potion',
        picture: faker.image.food(400, 400, true),
    }));

    await prisma.category.createMany({
        data: [
            { name: 'Adventuring Gear', icon: 'https://cdn-icons-png.flaticon.com/512/7474/7474351.png' },
            { name: 'Light Armor', icon: 'https://cdn-icons-png.flaticon.com/512/1065/1065537.png' },
            { name: 'Medium Armor', icon: 'https://cdn-icons-png.flaticon.com/512/1065/1065537.png' },
            { name: 'Heavy Armor', icon: 'https://cdn-icons-png.flaticon.com/512/1065/1065537.png' },
            { name: 'Shield', icon: 'https://cdn-icons-png.flaticon.com/512/2483/2483916.png' },
            { name: 'Martial Melee Weapon', icon: 'https://cdn-icons-png.flaticon.com/512/3763/3763558.png' },
            { name: 'Simple Melee Weapon', icon: 'https://cdn-icons-png.flaticon.com/512/3763/3763558.png' },
            { name: 'Martial Ranged Weapon', icon: 'https://cdn-icons-png.flaticon.com/512/2453/2453829.png' },
            { name: 'Simple Ranged Weapon', icon: 'https://cdn-icons-png.flaticon.com/512/2453/2453829.png' },
            { name: 'Potion', icon: 'https://cdn-icons-png.flaticon.com/512/2453/2453829.png' },
        ],
        skipDuplicates: true,
    });

    await prisma.equipment.createMany({
        data: [
            ...adventuringGearsList,
            ...lightArmorsList,
            ...mediumArmorsList,
            ...heavyArmorsList,
            ...shieldsList,
            ...martialMeleeWeaponsList,
            ...simpleMeleeWeaponsList,
            ...martialRangedWeaponsList,
            ...simpleRangedWeaponsList,
            ...potionsList,
        ],
        skipDuplicates: true,
    });
}

main()
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
