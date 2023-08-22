<template>
    <div class="cont-pedigree flex justify-center items-center">
        <!-- Parents -->
        <div class="flex flex-col space-y-10">
            <div class="p-2 rounded-md text-center">{{ parents.father }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ parents.mother }}</div>
        </div>
        <!-- Grandparents -->
        <div class="flex flex-col space-y-9">
            <div class="p-2 rounded-md text-center">{{ grandparents.fatherFather }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ grandparents.fatherMother }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ grandparents.motherFather }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ grandparents.motherMother }}</div>
        </div>
        <!-- Great Grandparents -->
        <div class="flex flex-col space-y-2">
            <div class="p-2 rounded-md text-center">{{ greatGrandParents.fatherFatherFather }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ greatGrandParents.fatherFatherMother }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ greatGrandParents.fatherMotherFather }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ greatGrandParents.fatherMotherMother }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ greatGrandParents.motherFatherFather }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ greatGrandParents.motherFatherMother }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ greatGrandParents.motherMotherFather }}</div>
            <div class="border-b border-gray-300 w-full"></div>
            <div class="p-2 rounded-md text-center">{{ greatGrandParents.motherMotherMother }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PedigreeComponent',
    props: {
        parents: Object,
        grandparents: Object,
        greatGrandParents: Object
    }
}
</script>